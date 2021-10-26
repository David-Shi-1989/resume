CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE blog;
-----------------------------------------------------------
-- Table Create
-- OP用户
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS op_user
(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  create_by VARCHAR (36) COMMENT '由哪个用户创建',
  create_date DATETIME NOT NULL,
  description VARCHAR (100),
  is_enable TINYINT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
INSERT INTO `op_user` (`id`, `username`, `password`, `create_date`, `description`) VALUES ('d7141fc5-c58d-4061-92ed-0d90f3bda3de', 'admin', 'admin', 'now()', '默认管理员帐户');
-----------------------------------------------------------
-- Table Create
-- OP用户登录记录
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS op_user_login
(
  id INT(16) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  login_datetime DATETIME NOT NULL,
  ip VARCHAR(36)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
-----------------------------------------------------------
-- Table Create
-- Article
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS op_article
(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  tags VARCHAR(200) NOT NULL,
  md TEXT NOT NULL,
  html TEXT NOT NULL,
  summary VARCHAR(128),
  create_by VARCHAR (36) COMMENT '由哪个用户创建',
  create_datetime DATETIME NOT NULL,
  modify_datetime DATETIME,
  visit_count INT(16) DEFAULT 0,
  like_count INT(16) DEFAULT 0,
  is_top TINYINT DEFAULT 0,
  is_draft TINYINT DEFAULT 0,
  is_enable TINYINT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
-----------------------------------------------------------
-- Table Create
-- Tag
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS op_tag
(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  refer_count INT(32) DEFAULT 0,
  create_by VARCHAR (36) COMMENT '由哪个用户创建',
  create_datetime DATETIME NOT NULL,
  is_enable TINYINT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;