-- Telangana Today Advertiser Billing System Database Schema
-- PostgreSQL 12+

-- Drop existing tables if they exist
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS advertisers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'staff')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Create advertisers table
CREATE TABLE advertisers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    contact_person VARCHAR(255),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_advertisers_email ON advertisers(email);
CREATE INDEX idx_advertisers_status ON advertisers(status);
CREATE INDEX idx_advertisers_created_by ON advertisers(created_by);

-- Create campaigns table
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    advertiser_id INTEGER NOT NULL REFERENCES advertisers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    ad_type VARCHAR(100) NOT NULL CHECK (ad_type IN ('Banner', 'Video', 'Text', 'Display', 'Social Media', 'Email')),
    booking_date DATE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    billing_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'paused', 'completed', 'cancelled')) DEFAULT 'active',
    renewal_date DATE,
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_campaigns_advertiser_id ON campaigns(advertiser_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_start_date ON campaigns(start_date);
CREATE INDEX idx_campaigns_end_date ON campaigns(end_date);
CREATE INDEX idx_campaigns_renewal_date ON campaigns(renewal_date);
CREATE INDEX idx_campaigns_created_by ON campaigns(created_by);

-- Create payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    payment_date DATE,
    payment_method VARCHAR(100) CHECK (payment_method IN ('bank_transfer', 'check', 'cash', 'credit_card', 'online')) DEFAULT 'bank_transfer',
    reference_number VARCHAR(255),
    status VARCHAR(50) NOT NULL CHECK (status IN ('paid', 'pending', 'failed', 'overdue')) DEFAULT 'pending',
    notes TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_campaign_id ON payments(campaign_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);
CREATE INDEX idx_payments_created_by ON payments(created_by);

-- Create notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL CHECK (type IN ('renewal_30days', 'renewal_15days', 'renewal_7days', 'renewal_today', 'payment_pending', 'payment_overdue', 'campaign_ending', 'new_campaign')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_campaign_id ON notifications(campaign_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id INTEGER NOT NULL,
    old_value TEXT,
    new_value TEXT,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_entity_id ON audit_logs(entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create view for campaign payment summary
CREATE VIEW campaign_payment_summary AS
SELECT 
    c.id as campaign_id,
    c.name as campaign_name,
    a.id as advertiser_id,
    a.name as advertiser_name,
    c.billing_amount as total_amount,
    COALESCE(SUM(CASE WHEN p.status = 'paid' THEN p.amount ELSE 0 END), 0) as paid_amount,
    COALESCE(SUM(CASE WHEN p.status = 'pending' THEN p.amount ELSE 0 END), 0) as pending_amount,
    COALESCE(SUM(CASE WHEN p.status = 'overdue' THEN p.amount ELSE 0 END), 0) as overdue_amount,
    c.status as campaign_status,
    c.renewal_date
FROM campaigns c
JOIN advertisers a ON c.advertiser_id = a.id
LEFT JOIN payments p ON c.id = p.campaign_id
GROUP BY c.id, c.name, a.id, a.name, c.billing_amount, c.status, c.renewal_date;

-- Create view for advertiser summary
CREATE VIEW advertiser_summary AS
SELECT 
    a.id,
    a.name,
    a.email,
    a.phone,
    a.status,
    COUNT(DISTINCT c.id) as total_campaigns,
    COUNT(DISTINCT CASE WHEN c.status = 'active' THEN c.id END) as active_campaigns,
    COALESCE(SUM(c.billing_amount), 0) as total_billing,
    COALESCE(SUM(CASE WHEN p.status = 'paid' THEN p.amount ELSE 0 END), 0) as paid_amount,
    COALESCE(SUM(CASE WHEN p.status = 'pending' THEN p.amount ELSE 0 END), 0) as pending_amount
FROM advertisers a
LEFT JOIN campaigns c ON a.id = c.advertiser_id
LEFT JOIN payments p ON c.id = p.campaign_id
GROUP BY a.id, a.name, a.email, a.phone, a.status;

-- Create view for revenue analysis
CREATE VIEW revenue_analysis AS
SELECT 
    DATE_TRUNC('month', c.start_date)::DATE as month,
    COUNT(DISTINCT c.id) as total_campaigns,
    COALESCE(SUM(c.billing_amount), 0) as monthly_revenue,
    COALESCE(SUM(CASE WHEN p.status = 'paid' THEN p.amount ELSE 0 END), 0) as received_amount,
    COALESCE(SUM(CASE WHEN p.status = 'pending' THEN p.amount ELSE 0 END), 0) as pending_amount
FROM campaigns c
LEFT JOIN payments p ON c.id = p.campaign_id
WHERE c.start_date IS NOT NULL
GROUP BY DATE_TRUNC('month', c.start_date)
ORDER BY month DESC;

-- Add comments to tables
COMMENT ON TABLE users IS 'Stores admin and staff user accounts';
COMMENT ON TABLE advertisers IS 'Advertiser company information and contact details';
COMMENT ON TABLE campaigns IS 'Campaign details with dates, amounts, and status';
COMMENT ON TABLE payments IS 'Payment records for campaigns';
COMMENT ON TABLE notifications IS 'System notifications for alerts and reminders';
COMMENT ON TABLE audit_logs IS 'Activity audit trail for compliance and tracking';
