CREATE TABLE tb_post (
	`id` varchar(20) NOT NULL
		PRIMARY KEY,
	`user_id` varchar(20) NOT NULL,
	`content` text NOT NULL,
	`create_date` timestamp NOT NULL
		DEFAULT NOW(),
	`post_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_key (
	`key` int(10) NOT NULL
		PRIMARY KEY,
	`comment` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_counter (
	`key` int(10) NOT NULL
		PRIMARY KEY,
	`count` int(10) NOT NULL
		DEFAULT 0,
	FOREIGN KEY(`key`) REFERENCES tb_key(`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_dictionary (
	`word_text` varchar(10) NOT NULL,
	`key` int(10) NOT NULL,
	`priority` int(10) NOT NULL
		DEFAULT 50,
	FOREIGN KEY(`key`) REFERENCES tb_key(`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tb_res_src (
	`action_id` int(10) NOT NULL,
	`key` int(10) NOT NULL,
	`priority` int(10) NOT NULL
		DEFAULT 50,
	`param1` varchar(100) NULL,
	`param2` varchar(100) NULL,
	`param3` varchar(100) NULL,
	FOREIGN KEY(`key`) REFERENCES tb_key(`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
