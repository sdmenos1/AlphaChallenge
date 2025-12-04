-- Database schema for UNTELS Sustainable Development Platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Petitions table
CREATE TABLE IF NOT EXISTS petitions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  signatures_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Signatures table
CREATE TABLE IF NOT EXISTS signatures (
  id SERIAL PRIMARY KEY,
  petition_id INTEGER REFERENCES petitions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(petition_id, user_id)
);

-- News/Articles table
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url VARCHAR(500),
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_petitions_user_id ON petitions(user_id);
CREATE INDEX IF NOT EXISTS idx_petitions_status ON petitions(status);
CREATE INDEX IF NOT EXISTS idx_signatures_petition_id ON signatures(petition_id);
CREATE INDEX IF NOT EXISTS idx_signatures_user_id ON signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
