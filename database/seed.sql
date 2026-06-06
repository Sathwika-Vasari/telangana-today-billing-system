-- Telangana Today Advertiser Billing System - Sample Data
-- This file populates the database with sample data for testing and demonstration

-- Insert sample users (passwords should be hashed in production)
INSERT INTO users (email, password, name, role, is_active) VALUES
('admin@telangantoday.com', '$2b$10$YOvt7WX.VxDqJ3vxuODPj.ZjzZjzZjzZjzZjzZjzZjzZjzZjzZjzZ', 'Admin User', 'admin', true),
('staff1@telangantoday.com', '$2b$10$YOvt7WX.VxDqJ3vxuODPj.ZjzZjzZjzZjzZjzZjzZjzZjzZjzZjzZ', 'Staff Member 1', 'staff', true),
('staff2@telangantoday.com', '$2b$10$YOvt7WX.VxDqJ3vxuODPj.ZjzZjzZjzZjzZjzZjzZjzZjzZjzZjzZ', 'Staff Member 2', 'staff', true);

-- Insert sample advertisers
INSERT INTO advertisers (name, email, phone, address, city, state, pincode, contact_person, status, created_by) VALUES
('Tech Solutions Pvt Ltd', 'contact@techsolutions.com', '9876543210', '123 Tech Street', 'Hyderabad', 'Telangana', '500081', 'Rajesh Kumar', 'active', 1),
('Digital Marketing Agency', 'hello@digitalagency.com', '9876543211', '456 Digital Plaza', 'Hyderabad', 'Telangana', '500082', 'Priya Singh', 'active', 1),
('E-Commerce Retail', 'support@ecommerce.com', '9876543212', '789 Commerce Building', 'Hyderabad', 'Telangana', '500083', 'Amit Patel', 'active', 1),
('Real Estate Ventures', 'info@realestate.com', '9876543213', '321 Property House', 'Hyderabad', 'Telangana', '500084', 'Neha Sharma', 'active', 1),
('Fashion & Retail Co', 'contact@fashionco.com', '9876543214', '654 Style Square', 'Hyderabad', 'Telangana', '500085', 'Anjali Desai', 'active', 1),
('Healthcare Services', 'admin@healthcare.com', '9876543215', '987 Medical Center', 'Hyderabad', 'Telangana', '500086', 'Dr. Ramesh Rao', 'active', 1),
('Automotive Dealers', 'sales@automotive.com', '9876543216', '147 Car Park Road', 'Hyderabad', 'Telangana', '500087', 'Vikram Yadav', 'inactive', 1),
('Education Institute', 'admissions@eduinst.com', '9876543217', '258 Academy Lane', 'Hyderabad', 'Telangana', '500088', 'Dr. Meera Nair', 'active', 1),
('Finance & Investment', 'invest@finance.com', '9876543218', '369 Financial Tower', 'Hyderabad', 'Telangana', '500089', 'Suresh Verma', 'active', 1),
('Hospitality Group', 'reservations@hospitality.com', '9876543219', '741 Hotel Plaza', 'Hyderabad', 'Telangana', '500090', 'Deepak Kumar', 'active', 1);

-- Insert sample campaigns
INSERT INTO campaigns (advertiser_id, name, ad_type, booking_date, start_date, end_date, billing_amount, status, renewal_date, description, created_by) VALUES
(1, 'Summer Tech Promotion 2024', 'Banner', '2024-01-15', '2024-02-01', '2024-03-01', 75000, 'active', '2024-09-01', 'Summer campaign for tech solutions', 1),
(1, 'Spring Product Launch', 'Video', '2024-01-20', '2024-02-10', '2024-04-10', 125000, 'active', '2024-10-10', 'Product launch video campaign', 1),
(2, 'Digital Marketing Quarterly', 'Display', '2024-01-25', '2024-02-01', '2024-04-30', 95000, 'active', '2024-08-30', 'Quarterly digital marketing push', 1),
(2, 'Social Media Campaign', 'Social Media', '2024-02-01', '2024-02-15', '2024-03-15', 50000, 'completed', '2024-09-15', 'Social media engagement campaign', 1),
(3, 'Valentine Day Sale', 'Banner', '2024-01-10', '2024-02-01', '2024-02-29', 85000, 'completed', '2024-08-29', 'Valentine''s day promotional banner', 1),
(3, 'Spring Fashion Week', 'Video', '2024-02-05', '2024-03-01', '2024-03-31', 150000, 'active', '2024-09-30', 'Fashion week promotional video', 1),
(4, 'Residential Project Launch', 'Display', '2024-01-18', '2024-02-15', '2024-05-15', 200000, 'active', '2024-11-15', 'New residential project promotion', 1),
(5, 'Summer Collection Launch', 'Banner', '2024-02-01', '2024-03-01', '2024-05-31', 100000, 'active', '2024-11-30', 'New summer fashion collection', 1),
(6, 'Health Awareness Campaign', 'Email', '2024-01-22', '2024-02-20', '2024-04-20', 60000, 'active', '2024-10-20', 'Health and wellness campaign', 1),
(7, 'Car Festival 2024', 'Video', '2024-01-19', '2024-03-01', '2024-04-30', 180000, 'paused', '2024-10-30', 'Annual car festival promotion', 1),
(8, 'Admission Drive 2024', 'Banner', '2024-02-03', '2024-04-01', '2024-06-30', 110000, 'active', '2024-12-30', 'College admission campaign', 1),
(9, 'Investment Opportunities', 'Display', '2024-01-28', '2024-02-15', '2024-05-15', 140000, 'active', '2024-11-15', 'Investment and wealth management', 1),
(10, 'Hotel Booking Campaign', 'Banner', '2024-02-02', '2024-03-01', '2024-06-30', 95000, 'active', '2024-12-30', 'Seasonal hotel booking promotion', 1);

-- Insert sample payments
INSERT INTO payments (campaign_id, amount, payment_date, payment_method, reference_number, status, notes, created_by) VALUES
(1, 75000, '2024-02-02', 'bank_transfer', 'TT2024001', 'paid', 'Initial payment received', 1),
(2, 125000, '2024-02-11', 'bank_transfer', 'TT2024002', 'paid', 'Campaign launched successfully', 1),
(3, 47500, '2024-02-02', 'check', 'CHK2024001', 'paid', 'First installment', 1),
(3, 47500, '2024-03-15', 'bank_transfer', 'TT2024003', 'pending', 'Second installment due', 1),
(4, 50000, '2024-02-16', 'bank_transfer', 'TT2024004', 'paid', 'Completed campaign payment', 1),
(5, 85000, '2024-02-02', 'credit_card', 'CC2024001', 'paid', 'Valentine campaign payment', 1),
(6, 75000, '2024-03-02', 'bank_transfer', 'TT2024005', 'paid', 'First phase of fashion week', 1),
(6, 75000, '2024-04-05', 'bank_transfer', 'TT2024006', 'overdue', 'Second phase - payment overdue', 1),
(7, 100000, '2024-02-16', 'bank_transfer', 'TT2024007', 'paid', 'Residential project phase 1', 1),
(7, 100000, '2024-05-01', 'bank_transfer', 'TT2024008', 'pending', 'Residential project phase 2', 1),
(8, 100000, '2024-03-02', 'online', 'ONL2024001', 'paid', 'Summer collection campaign', 1),
(9, 30000, '2024-02-21', 'bank_transfer', 'TT2024009', 'paid', 'Health campaign phase 1', 1),
(9, 30000, '2024-04-20', 'bank_transfer', 'TT2024010', 'pending', 'Health campaign phase 2', 1),
(10, 90000, '2024-03-02', 'check', 'CHK2024002', 'paid', 'Car festival campaign', 1),
(10, 90000, '2024-04-15', 'bank_transfer', 'TT2024011', 'failed', 'Payment failed - retry needed', 1),
(11, 55000, '2024-04-02', 'bank_transfer', 'TT2024012', 'paid', 'Admission campaign phase 1', 1),
(11, 55000, '2024-06-15', 'bank_transfer', 'TT2024013', 'pending', 'Admission campaign phase 2', 1),
(12, 70000, '2024-02-16', 'bank_transfer', 'TT2024014', 'paid', 'Investment campaign phase 1', 1),
(12, 70000, '2024-05-01', 'bank_transfer', 'TT2024015', 'pending', 'Investment campaign phase 2', 1),
(13, 47500, '2024-03-02', 'bank_transfer', 'TT2024016', 'paid', 'Hotel campaign phase 1', 1),
(13, 47500, '2024-06-15', 'bank_transfer', 'TT2024017', 'pending', 'Hotel campaign phase 2', 1);

-- Insert sample notifications
INSERT INTO notifications (user_id, campaign_id, type, title, message, is_read) VALUES
(2, 1, 'renewal_30days', 'Campaign Renewal in 30 Days', 'Campaign "Summer Tech Promotion 2024" will renew on 2024-09-01', false),
(2, 4, 'renewal_7days', 'Campaign Renewal in 7 Days', 'Campaign "Spring Fashion Week" will renew on 2024-09-30', false),
(2, 6, 'payment_pending', 'Payment Due', 'Payment for campaign "Spring Fashion Week" is pending', false),
(2, 10, 'payment_overdue', 'Overdue Payment', 'Payment for campaign "Car Festival 2024" is overdue by 10 days', true),
(3, 7, 'renewal_15days', 'Campaign Renewal in 15 Days', 'Campaign "Residential Project Launch" will renew on 2024-11-15', false),
(3, 9, 'payment_pending', 'Payment Pending', 'Second payment for "Health Awareness Campaign" is pending', false),
(1, 2, 'new_campaign', 'New Campaign Created', 'New campaign "Spring Product Launch" has been created', true),
(1, 5, 'campaign_ending', 'Campaign Ending Soon', 'Campaign "Valentine Day Sale" is ending on 2024-02-29', true);

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent) VALUES
(1, 'CREATE', 'advertiser', 1, NULL, '{"name": "Tech Solutions Pvt Ltd"}', '192.168.1.100', 'Mozilla/5.0'),
(1, 'CREATE', 'campaign', 1, NULL, '{"name": "Summer Tech Promotion 2024"}', '192.168.1.100', 'Mozilla/5.0'),
(2, 'CREATE', 'payment', 1, NULL, '{"amount": 75000, "status": "paid"}', '192.168.1.101', 'Mozilla/5.0'),
(1, 'UPDATE', 'advertiser', 2, '{"status": "inactive"}', '{"status": "active"}', '192.168.1.100', 'Mozilla/5.0'),
(2, 'UPDATE', 'campaign', 10, '{"status": "active"}', '{"status": "paused"}', '192.168.1.101', 'Mozilla/5.0'),
(3, 'UPDATE', 'payment', 6, '{"status": "pending"}', '{"status": "paid"}', '192.168.1.102', 'Mozilla/5.0'),
(1, 'CREATE', 'campaign', 12, NULL, '{"name": "Investment Opportunities"}', '192.168.1.100', 'Mozilla/5.0'),
(2, 'DELETE', 'campaign', 14, '{"id": 14}', NULL, '192.168.1.101', 'Mozilla/5.0');

-- Add some more advertisers for better demo data
INSERT INTO advertisers (name, email, phone, address, city, state, pincode, contact_person, status, created_by) VALUES
('Textile Manufacturing Co', 'contact@textile.com', '9876543220', '852 Mill Road', 'Hyderabad', 'Telangana', '500091', 'Ramakrishna Rao', 'active', 1),
('Restaurant Chain Network', 'bookings@restaurant.com', '9876543221', '963 Food Court', 'Hyderabad', 'Telangana', '500092', 'Anand Kulkarni', 'active', 1);

-- Add more campaigns for demo
INSERT INTO campaigns (advertiser_id, name, ad_type, booking_date, start_date, end_date, billing_amount, status, renewal_date, description, created_by) VALUES
(11, 'Textile Expo 2024', 'Banner', '2024-02-10', '2024-03-15', '2024-05-15', 130000, 'active', '2024-11-15', 'Textile industry expo promotion', 1),
(12, 'Summer Food Festival', 'Video', '2024-02-08', '2024-04-01', '2024-06-30', 165000, 'active', '2024-12-30', 'Annual food festival campaign', 1);

-- Add payments for new campaigns
INSERT INTO payments (campaign_id, amount, payment_date, payment_method, reference_number, status, notes, created_by) VALUES
(14, 65000, '2024-03-16', 'bank_transfer', 'TT2024018', 'paid', 'Textile expo phase 1', 1),
(14, 65000, '2024-05-15', 'bank_transfer', 'TT2024019', 'pending', 'Textile expo phase 2', 1),
(15, 82500, '2024-04-02', 'bank_transfer', 'TT2024020', 'paid', 'Food festival phase 1', 1),
(15, 82500, '2024-06-15', 'bank_transfer', 'TT2024021', 'pending', 'Food festival phase 2', 1);
