-- Database Schema for Favorite Jokes

CREATE TABLE IF NOT EXISTS favorite_jokes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  type ENUM('single', 'twopart') NOT NULL,
  joke_text LONGTEXT,
  setup LONGTEXT,
  delivery LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (user_id),
  INDEX (created_at)
);
