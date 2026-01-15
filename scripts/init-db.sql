-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(10, 2) NOT NULL,
  current_amount DECIMAL(10, 2) DEFAULT 0,
  target_date TEXT,
  category TEXT,
  icon TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  goal_id INTEGER,
  type TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  transaction_date TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (goal_id) REFERENCES goals(id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert demo user
INSERT INTO users (email, password, name) VALUES ('demo@example.com', 'password123', 'Demo User');

-- Insert demo goals
INSERT INTO goals (user_id, name, description, target_amount, current_amount, target_date, category, icon, status)
VALUES 
  (1, 'House Downpayment', 'Save for a new house', 100000, 45000, '2026-12-31', 'home', '🏠', 'active'),
  (1, 'Retirement Fund', 'Long-term retirement savings', 500000, 25000, '2035-12-31', 'retirement', '🏖️', 'active'),
  (1, 'Travel Europe', 'Summer vacation to Europe', 10000, 2500, '2026-06-30', 'travel', '✈️', 'active'),
  (1, 'Education Fund', 'Further education and courses', 30000, 10000, '2027-06-30', 'education', '📚', 'active'),
  (1, 'New Car', 'Buy a new vehicle', 20000, 6000, '2026-09-30', 'vehicle', '🚗', 'active');

-- Insert demo transactions
INSERT INTO transactions (user_id, goal_id, type, amount, description, transaction_date)
VALUES 
  (1, 1, 'deposit', 700, 'Freelance Payment', '2025-11-24'),
  (1, NULL, 'withdrawal', -85, 'Utility Bill', '2025-11-20'),
  (1, 2, 'deposit', 1000, 'Investment Deposit', '2025-11-17'),
  (1, NULL, 'withdrawal', -120, 'Groceries', '2025-11-12'),
  (1, 1, 'deposit', 500, 'Savings Transfer', '2025-11-09'),
  (1, NULL, 'withdrawal', -75.50, 'Online Shopping', '2025-11-07'),
  (1, 3, 'deposit', 400, 'Monthly Savings', '2025-11-01'),
  (1, 4, 'deposit', 300, 'Regular Contribution', '2025-10-28'),
  (1, 5, 'deposit', 600, 'Goal Contribution', '2025-10-25');
