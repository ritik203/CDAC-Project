-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema moviedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema moviedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `moviedb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `moviedb` ;

-- -----------------------------------------------------
-- Table `moviedb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviedb`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(40) NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `mobile_UNIQUE` (`mobile` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`location`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `pincode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE INDEX `location_id_UNIQUE` (`location_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`user_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviedb`.`user_location` (
  `location_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `fk_user_location_location_idx` (`location_id` ASC) VISIBLE,
  INDEX `fk_user_location_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_location_location`
    FOREIGN KEY (`location_id`)
    REFERENCES `moviedb`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_location_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `moviedb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviedb`.`movie` (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `movie_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `duration` VARCHAR(45) NULL,
  `genre` VARCHAR(45) NULL,
  `release_date` DATE NULL,
  `language` VARCHAR(45) NULL,
  `image_url` VARCHAR(100) NULL,
  PRIMARY KEY (`movie_id`),
  UNIQUE INDEX `movie_id_UNIQUE` (`movie_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`theatre_admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviedb`.`theatre_admin` (
  `theatre_admin_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`theatre_admin_id`),
  UNIQUE INDEX `theatre_admin_id_UNIQUE` (`theatre_admin_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `mobile_UNIQUE` (`mobile` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviedb`.`city` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `pincode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE INDEX `city_id_UNIQUE` (`city_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`theatre`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`theatre` (
  `theatre_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `no_of_screens` INT NOT NULL,
  `theatre_admin_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`theatre_id`),
  UNIQUE INDEX `theatre_id_UNIQUE` (`theatre_id` ASC) VISIBLE,
  INDEX `fk_theatre_theatre_admin1_idx` (`theatre_admin_id` ASC) VISIBLE,
  INDEX `fk_theatre_city1_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_theatre_theatre_admin1`
    FOREIGN KEY (`theatre_admin_id`)
    REFERENCES `moviedb`.`theatre_admin` (`theatre_admin_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_theatre_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `moviedb`.`city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`screen`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`screen` (
  `screen_id` INT NOT NULL AUTO_INCREMENT,
  `total_seats` VARCHAR(45) NOT NULL,
  `theatre_id` INT NOT NULL,
  PRIMARY KEY (`screen_id`),
  UNIQUE INDEX `screen_id_UNIQUE` (`screen_id` ASC) VISIBLE,
  INDEX `fk_screen_theatre1_idx` (`theatre_id` ASC) VISIBLE,
  CONSTRAINT `fk_screen_theatre1`
    FOREIGN KEY (`theatre_id`)
    REFERENCES `moviedb`.`theatre` (`theatre_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`time`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`time` (
  `time_id` INT NOT NULL AUTO_INCREMENT,
  `start_time` VARCHAR(5) NULL,
  `end_time` VARCHAR(5) NULL,
  PRIMARY KEY (`time_id`),
  UNIQUE INDEX `time_id_UNIQUE` (`time_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`show`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`show` (
  `show_id` INT NOT NULL AUTO_INCREMENT,
  `show_date` DATE NOT NULL,
  `movie_id` INT NOT NULL,
  `screen_id` INT NOT NULL,
  `time_id` INT NOT NULL,
  PRIMARY KEY (`show_id`),
  UNIQUE INDEX `show_id_UNIQUE` (`show_id` ASC) VISIBLE,
  INDEX `fk_show_movie1_idx` (`movie_id` ASC) VISIBLE,
  INDEX `fk_show_screen1_idx` (`screen_id` ASC) VISIBLE,
  INDEX `fk_show_time1_idx` (`time_id` ASC) VISIBLE,
  CONSTRAINT `fk_show_movie1`
    FOREIGN KEY (`movie_id`)
    REFERENCES `moviedb`.`movie` (`movie_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_show_screen1`
    FOREIGN KEY (`screen_id`)
    REFERENCES `moviedb`.`screen` (`screen_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_show_time1`
    FOREIGN KEY (`time_id`)
    REFERENCES `moviedb`.`time` (`time_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`screen_seat`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `moviedb`.`screen_seat` (
  `screen_seat_id` INT NOT NULL AUTO_INCREMENT,
  `seatno` VARCHAR(10) NOT NULL,
  `screen_id` INT NOT NULL,
  PRIMARY KEY (`screen_seat_id`),
  UNIQUE INDEX `screen_id_UNIQUE` (`screen_seat_id` ASC) VISIBLE,
  INDEX `fk_screen_seat_screen1_idx` (`screen_id` ASC) VISIBLE,
  CONSTRAINT `fk_screen_seat_screen1`
    FOREIGN KEY (`screen_id`)
    REFERENCES `moviedb`.`screen` (`screen_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`show_seat`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`show_seat` (
  `show_seat_id` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT NOT NULL,
  `price` DOUBLE NOT NULL,
  `duration` VARCHAR(10) NOT NULL,
  `show_id` INT NOT NULL,
  `screen_id` INT NOT NULL,
  PRIMARY KEY (`show_seat_id`),
  UNIQUE INDEX `show_seat_id_UNIQUE` (`show_seat_id` ASC) VISIBLE,
  INDEX `fk_show_seat_show1_idx` (`show_id` ASC) VISIBLE,
  INDEX `fk_show_seat_screen_seat1_idx` (`screen_id` ASC) VISIBLE,
  CONSTRAINT `fk_show_seat_show1`
    FOREIGN KEY (`show_id`)
    REFERENCES `moviedb`.`show` (`show_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_show_seat_screen_seat1`
    FOREIGN KEY (`screen_id`)
    REFERENCES `moviedb`.`screen_seat` (`screen_seat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviedb`.`payment`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`payment` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `amount` DOUBLE NOT NULL,
  `date_time` VARCHAR(50) NOT NULL,
  `method` VARCHAR(20) NOT NULL,
  `transaction_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE INDEX `payment_id_UNIQUE` (`payment_id` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `moviedb`.`booking`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `moviedb`.`booking` (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `no_of_seats` INT NOT NULL,
  `booking_time` VARCHAR(10) NOT NULL,
  `theatre_id` INT NOT NULL,
  `show_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`booking_id`),
  UNIQUE INDEX `booking_id_UNIQUE` (`booking_id` ASC) VISIBLE,
  INDEX `fk_booking_theatre1_idx` (`theatre_id` ASC) VISIBLE,
  INDEX `fk_booking_show1_idx` (`show_id` ASC) VISIBLE,
  INDEX `fk_booking_payment1_idx` (`payment_id` ASC) VISIBLE,
  INDEX `fk_booking_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_booking_theatre1`
    FOREIGN KEY (`theatre_id`)
    REFERENCES `moviedb`.`theatre` (`theatre_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_show1`
    FOREIGN KEY (`show_id`)
    REFERENCES `moviedb`.`show` (`show_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_payment1`
    FOREIGN KEY (`payment_id`)
    REFERENCES `moviedb`.`payment` (`payment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `moviedb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



------------------------------------------------------------------


CREATE TABLE IF NOT EXISTS `moviedb`.`movie_theatre` (
  `movie_theatre_id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `theatre_id` INT NOT NULL,
  PRIMARY KEY (`movie_theatre_id`),
  UNIQUE INDEX `unique_movie_theatre` (`movie_id`, `theatre_id`),
  INDEX `fk_movie_theatre_movie_idx` (`movie_id` ASC),
  INDEX `fk_movie_theatre_theatre_idx` (`theatre_id` ASC),
  CONSTRAINT `fk_movie_theatre_movie`
    FOREIGN KEY (`movie_id`)
    REFERENCES `moviedb`.`movie` (`movie_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_theatre_theatre`
    FOREIGN KEY (`theatre_id`)
    REFERENCES `moviedb`.`theatre` (`theatre_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
    
    drop table payment;
    
    
CREATE TABLE IF NOT EXISTS moviedb.payment (
  payment_id INT NOT NULL AUTO_INCREMENT,
  amount DOUBLE NOT NULL,
  date_time VARCHAR(50) NOT NULL,
  method VARCHAR(20) NOT NULL,
  transaction_id VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (payment_id),
  UNIQUE INDEX payment_id_UNIQUE (payment_id ASC) VISIBLE,
  CONSTRAINT fk_payment_user
    FOREIGN KEY (user_id)
    REFERENCES moviedb.user (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


use moviedb;




-- Inserting into user table with unique mobile numbers----------------

INSERT INTO `user` (`name`, `email`, `mobile`, `password`, `role`)
VALUES
('John Doe', 'john@example.com', '1234567890', 'password123', 'customer'),
('Jane Smith', 'jane@example.com', '0987654321', 'password123', 'customer'),
('Alice Johnson', 'alice@example.com', '1122334455', 'password123', 'customer'),
('Bob Brown', 'bob@example.com', '2233445566', 'password123', 'admin'),
('Charlie Davis', 'charlie@example.com', '3344556677', 'password123', 'customer'),
('David Green', 'david@example.com', '4455667789', 'password123', 'customer'),
('Eva White', 'eva@example.com', '5566778899', 'password123', 'customer'),
('Frank Black', 'frank@example.com', '6677889900', 'password123', 'customer'),
('Grace Blue', 'grace@example.com', '7788990011', 'password123', 'admin'),
('Hank Red', 'hank@example.com', '8899001122', 'password123', 'customer'),
('Ivy Gray', 'ivy@example.com', '9900112233', 'password123', 'customer'),
('Jack Yellow', 'jack@example.com', '1011122334', 'password123', 'customer'),
('Kathy Purple', 'kathy@example.com', '1122334456', 'password123', 'admin'),
('Louis Orange', 'louis@example.com', '2233445567', 'password123', 'customer'),
('Mia Pink', 'mia@example.com', '3344556678', 'password123', 'customer'),
('Nina Brown', 'nina@example.com', '4455667788', 'password123', 'admin'),
('Oscar Red', 'oscar@example.com', '5566778890', 'password123', 'customer'),
('Paul Green', 'paul@example.com', '6677889901', 'password123', 'customer'),
('Quincy White', 'quincy@example.com', '7788990012', 'password123', 'customer');



INSERT INTO `location` (`street`, `city`, `state`, `country`, `pincode`)
VALUES
('123 Elm St', 'Los Angeles', 'California', 'USA', '90001'),
('456 Maple St', 'New York', 'New York', 'USA', '10001'),
('789 Pine St', 'Chicago', 'Illinois', 'USA', '60601'),
('101 Oak St', 'Houston', 'Texas', 'USA', '77001'),
('202 Birch St', 'Phoenix', 'Arizona', 'USA', '85001'),
('303 Cedar St', 'San Francisco', 'California', 'USA', '94101'),
('404 Birch St', 'Boston', 'Massachusetts', 'USA', '02101'),
('505 Pine St', 'Miami', 'Florida', 'USA', '33101'),
('606 Maple St', 'Atlanta', 'Georgia', 'USA', '30301'),
('707 Oak St', 'Dallas', 'Texas', 'USA', '75201'),
('808 Elm St', 'Seattle', 'Washington', 'USA', '98101'),
('909 Birch St', 'Denver', 'Colorado', 'USA', '80201'),
('1010 Pine St', 'Chicago', 'Illinois', 'USA', '60602'),
('1111 Cedar St', 'Los Angeles', 'California', 'USA', '90002'),
('1212 Oak St', 'Houston', 'Texas', 'USA', '77002'),
('1313 Birch St', 'Phoenix', 'Arizona', 'USA', '85002'),
('1414 Maple St', 'San Francisco', 'California', 'USA', '94102'),
('1515 Cedar St', 'Miami', 'Florida', 'USA', '33102'),
('1616 Pine St', 'Boston', 'Massachusetts', 'USA', '02102');


select * from `user`;



INSERT INTO `user_location` (`location_id`, `user_id`)
VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15),
(16, 16), (17, 17), (18, 18), (19, 19);



desc `user_location`;

INSERT INTO `movie` (`movie_name`, `description`, `duration`, `genre`, `release_date`, `language`)
VALUES
('Inception', 'Sci-fi thriller', '2:28', 'Sci-fi', '2010-07-16', 'English'),
('Titanic', 'Romantic drama', '3:14', 'Romance', '1997-12-19', 'English'),
('The Matrix', 'Sci-fi action', '2:16', 'Sci-fi', '1999-03-31', 'English'),
('Avengers: Endgame', 'Superhero epic', '3:02', 'Action', '2019-04-26', 'English'),
('The Lion King', 'Animated drama', '1:58', 'Animation', '1994-06-15', 'English'),
('The Dark Knight', 'Action thriller', '2:32', 'Action', '2008-07-18', 'English'),
('Forrest Gump', 'Drama', '2:22', 'Drama', '1994-07-06', 'English'),
('Interstellar', 'Sci-fi drama', '2:49', 'Sci-fi', '2014-11-07', 'English'),
('The Shawshank Redemption', 'Drama', '2:22', 'Drama', '1994-09-22', 'English'),
('Pulp Fiction', 'Crime drama', '2:34', 'Crime', '1994-10-14', 'English'),
('The Godfather', 'Crime drama', '2:55', 'Crime', '1972-03-24', 'English'),
('The Avengers', 'Superhero action', '2:23', 'Action', '2012-05-04', 'English'),
('Gladiator', 'Action drama', '2:35', 'Action', '2000-05-05', 'English'),
('Jurassic Park', 'Sci-fi adventure', '2:07', 'Adventure', '1993-06-11', 'English'),
('Star Wars: A New Hope', 'Sci-fi adventure', '2:01', 'Sci-fi', '1977-05-25', 'English'),
('Inglourious Basterds', 'War drama', '2:33', 'War', '2009-08-21', 'English'),
('The Departed', 'Crime thriller', '2:31', 'Thriller', '2006-10-06', 'English'),
('The Prestige', 'Sci-fi thriller', '2:10', 'Thriller', '2006-10-20', 'English'),
('Deadpool', 'Action comedy', '1:48', 'Action', '2016-02-12', 'English'),
('The Revenant', 'Adventure drama', '2:36', 'Adventure', '2015-12-25', 'English');


desc moviedb.`movie`;
select * from movie;


-- Inserting into theatre_admin table with unique mobile numbers
INSERT INTO `moviedb`.`theatre_admin` (`name`, `email`, `mobile`, `password`, `role`)
VALUES
('Admin A', 'adminA@example.com', '1112223333', 'admin123', 'theatre_admin'),
('Admin B', 'adminB@example.com', '2223334444', 'admin123', 'theatre_admin'),
('Admin C', 'adminC@example.com', '3334445555', 'admin123', 'theatre_admin'),
('Admin D', 'adminD@example.com', '4445556666', 'admin123', 'theatre_admin'),
('Admin E', 'adminE@example.com', '5556667777', 'admin123', 'theatre_admin'),
('Admin F', 'adminF@example.com', '6667778888', 'admin123', 'theatre_admin'),
('Admin G', 'adminG@example.com', '7778889999', 'admin123', 'theatre_admin'),
('Admin H', 'adminH@example.com', '8889990000', 'admin123', 'theatre_admin'),
('Admin I', 'adminI@example.com', '9990001111', 'admin123', 'theatre_admin'),
('Admin J', 'adminJ@example.com', '1000111222', 'admin123', 'theatre_admin'),
('Admin K', 'adminK@example.com', '1100222333', 'admin123', 'theatre_admin'),
('Admin L', 'adminL@example.com', '1200333444', 'admin123', 'theatre_admin'),
('Admin M', 'adminM@example.com', '1300444555', 'admin123', 'theatre_admin'),
('Admin N', 'adminN@example.com', '1400555666', 'admin123', 'theatre_admin'),
('Admin O', 'adminO@example.com', '1500666777', 'admin123', 'theatre_admin'),
('Admin P', 'adminP@example.com', '1600777888', 'admin123', 'theatre_admin'),
('Admin Q', 'adminQ@example.com', '1700888999', 'admin123', 'theatre_admin'),
('Admin R', 'adminR@example.com', '1800999000', 'admin123', 'theatre_admin'),
('Admin S', 'adminS@example.com', '1901100111', 'admin123', 'theatre_admin'),
('Admin T', 'adminT@example.com', '2002200222', 'admin123', 'theatre_admin');



INSERT INTO `city` (`name`, `district`, `state`, `pincode`)
VALUES
('Los Angeles', 'LA District', 'California', '90001'),
('New York', 'NY District', 'New York', '10001'),
('Chicago', 'CH District', 'Illinois', '60601'),
('Houston', 'HT District', 'Texas', '77001'),
('Phoenix', 'PH District', 'Arizona', '85001'),
('San Francisco', 'SF District', 'California', '94101'),
('Boston', 'BS District', 'Massachusetts', '02101'),
('Miami', 'MIA District', 'Florida', '33101'),
('Atlanta', 'ATL District', 'Georgia', '30301'),
('Dallas', 'DAL District', 'Texas', '75201'),
('Seattle', 'SEA District', 'Washington', '98101'),
('Denver', 'DEN District', 'Colorado', '80201'),
('San Diego', 'SD District', 'California', '92101'),
('Austin', 'AUS District', 'Texas', '73301'),
('Orlando', 'ORL District', 'Florida', '32801'),
('Chicago', 'CHI District', 'Illinois', '60603'),
('Portland', 'POR District', 'Oregon', '97201'),
('Phoenix', 'PHX District', 'Arizona', '85002'),
('Salt Lake City', 'SLC District', 'Utah', '84101');


INSERT INTO city (name, district, state, pincode) VALUES
('Mumbai', 'Mumbai Suburban', 'Maharashtra', '400001'),
('Delhi', 'Central Delhi', 'Delhi', '110001'),
('Bangalore', 'Bangalore Urban', 'Karnataka', '560001'),
('Hyderabad', 'Hyderabad', 'Telangana', '500001'),
('Chennai', 'Chennai', 'Tamil Nadu', '600001'),
('Kolkata', 'Kolkata', 'West Bengal', '700001'),
('Pune', 'Pune', 'Maharashtra', '411001'),
('Ahmedabad', 'Ahmedabad', 'Gujarat', '380001'),
('Jaipur', 'Jaipur', 'Rajasthan', '302001'),
('Lucknow', 'Lucknow', 'Uttar Pradesh', '226001'),
('Surat', 'Surat', 'Gujarat', '395001'),
('Kanpur', 'Kanpur Nagar', 'Uttar Pradesh', '208001'),
('Nagpur', 'Nagpur', 'Maharashtra', '440001'),
('Indore', 'Indore', 'Madhya Pradesh', '452001'),
('Bhopal', 'Bhopal', 'Madhya Pradesh', '462001');

select * from city;




INSERT INTO `theatre` (`name`, `no_of_screens`, `theatre_admin_id`, `city_id`)
VALUES
('Regal LA', 10, 1, 1),
('AMC NY', 8, 2, 2),
('Cinemark Chicago', 12, 3, 3),
('Alamo Houston', 6, 4, 4),
('Harkins Phoenix', 7, 5, 5),
('Regal San Francisco', 10, 6, 6),
('AMC Boston', 8, 7, 7),
('Cinemark Miami', 12, 8, 8),
('Alamo Atlanta', 6, 9, 9),
('Harkins Dallas', 7, 10, 10),
('Regal Seattle', 10, 11, 11),
('AMC Denver', 8, 12, 12),
('Cinemark San Diego', 12, 13, 13),
('Alamo Austin', 6, 14, 14),
('Harkins Orlando', 7, 15, 15),
('Regal Chicago', 10, 16, 16),
('AMC Portland', 8, 17, 17),
('Cinemark Salt Lake City', 12, 18, 18),
('Alamo Phoenix', 6, 19, 19);

INSERT INTO `theatre` (`name`, `no_of_screens`, `theatre_admin_id`, `city_id`) VALUES
-- Mumbai
('PVR Mumbai Central', 5, 1, 20),
('INOX Nariman Point', 4, 2, 20),
('Carnival Cinemas Andheri', 6, 3, 20),
('Cinepolis Mumbai', 5, 4, 20),

-- Delhi
('PVR Connaught Place', 4, 5, 21),
('INOX Janakpuri', 5, 6, 21),
('Carnival Cinemas Saket', 6, 7, 21),
('Cinepolis Rohini', 4, 8, 21),

-- Bangalore
('PVR Koramangala', 6, 9, 22),
('INOX JP Nagar', 5, 10, 22),
('Carnival Cinemas Whitefield', 4, 11, 22),
('Cinepolis MG Road', 6, 12, 22),

-- Hyderabad
('PVR Banjara Hills', 5, 13, 23),
('INOX Gachibowli', 4, 14, 23),
('Carnival Cinemas Secunderabad', 6, 15, 23),
('Cinepolis Kukatpally', 5, 16, 23),

-- Chennai
('PVR Express Avenue', 5, 17, 24),
('INOX Phoenix Market City', 4, 18, 24),
('Carnival Cinemas Anna Nagar', 6, 19, 24),
('Cinepolis OMR', 5, 20, 24),

-- Kolkata
('PVR South City Mall', 6, 1, 25),
('INOX Quest Mall', 5, 2, 25),
('Carnival Cinemas Salt Lake', 4, 3, 25),
('Cinepolis Howrah', 6, 4, 25),

-- Pune
('PVR Phoenix Market City', 5, 5, 26),
('INOX Camp Pune', 4, 6, 26),
('Carnival Cinemas Hadapsar', 6, 7, 26),
('Cinepolis Wakad', 5, 8, 26),

-- Ahmedabad
('PVR CG Road', 5, 9, 27),
('INOX Alpha One Mall', 4, 10, 27),
('Carnival Cinemas Maninagar', 6, 11, 27),
('Cinepolis SG Highway', 5, 12, 27),

-- Jaipur
('PVR Vaishali Nagar', 6, 13, 28),
('INOX Crystal Palm', 5, 14, 28),
('Carnival Cinemas Mansarovar', 4, 15, 28),
('Cinepolis Pink City', 6, 16, 28),

-- Lucknow
('PVR Phoenix United Mall', 5, 17, 29),
('INOX Gomti Nagar', 4, 18, 29),
('Carnival Cinemas Alambagh', 6, 19, 29),
('Cinepolis Indira Nagar', 5, 20, 29),

-- Surat
('PVR VR Mall', 6, 1, 30),
('INOX Rajhans', 5, 2, 30),
('Carnival Cinemas Adajan', 4, 3, 30),
('Cinepolis Citylight', 6, 4, 30),

-- Kanpur
('PVR Z Square Mall', 5, 5, 31),
('INOX South X Mall', 4, 6, 31),
('Carnival Cinemas Kidwai Nagar', 6, 7, 31),
('Cinepolis Swaroop Nagar', 5, 8, 31),

-- Nagpur
('PVR Empress Mall', 5, 9, 32),
('INOX Eternity Mall', 4, 10, 32),
('Carnival Cinemas Sadar', 6, 11, 32),
('Cinepolis Dharampeth', 5, 12, 32),

-- Indore
('PVR Treasure Island Mall', 6, 13, 33),
('INOX C21 Mall', 5, 14, 33),
('Carnival Cinemas Vijay Nagar', 4, 15, 33),
('Cinepolis Sapna Sangeeta', 6, 16, 33),

-- Bhopal
('PVR DB Mall', 5, 17, 34),
('INOX Aashima Mall', 4, 18, 34),
('Carnival Cinemas MP Nagar', 6, 19, 34),
('Cinepolis Kolar Road', 5, 20, 34);

select * from `theatre`;


INSERT INTO `screen` (`total_seats`, `theatre_id`)
VALUES
(200, 1), (150, 2), (300, 3), (100, 4), (180, 5),
(250, 6), (120, 7), (200, 8), (150, 9), (300, 10),
(100, 11), (180, 12), (250, 13), (120, 14), (200, 15),
(150, 16), (300, 17), (100, 18), (180, 19);



INSERT INTO `movie_theatre` (`theatre_id`, `movie_id`)
VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15),
(16, 16), (17, 17), (18, 18), (19, 19);

select * from movie_theatre;


-- Inserting into time table
INSERT INTO `moviedb`.`time` (`start_time`, `end_time`)
VALUES
('10:00', '12:30'),
('13:00', '15:30'),
('16:00', '18:30'),
('19:00', '21:30'),
('22:00', '00:30'),
('07:00', '09:30'),
('08:00', '10:30'),
('11:00', '13:30'),
('12:00', '14:30'),
('14:00', '16:30'),
('15:00', '17:30'),
('16:30', '19:00'),
('17:30', '20:00'),
('18:30', '21:00'),
('19:30', '22:00'),
('20:30', '23:00'),
('21:30', '00:00'),
('22:30', '01:00'),
('23:00', '01:30'),
('23:30', '02:00');


INSERT INTO `moviedb`.`screen` (`total_seats`, `theatre_id`) 
VALUES 
('150', 20),
('120', 21),
('180', 22),
('160', 23),
('140', 24),
('130', 25),
('170', 26),
('150', 27),
('190', 28),
('160', 29),
('140', 30),
('180', 31),
('150', 32),
('120', 33),
('180', 34),
('160', 35),
('140', 36),
('130', 37),
('170', 38),
('150', 39),
('190', 40),
('160', 41),
('140', 42),
('180', 43),
('150', 44),
('120', 45),
('180', 46),
('160', 47),
('140', 48),
('130', 49),
('170', 50);



-- Inserting into show table
INSERT INTO `moviedb`.`show` (`show_date`, `movie_id`, `screen_id`, `time_id`)
VALUES
('2024-12-25', 1, 1, 1),
('2024-12-25', 2, 2, 2),
('2024-12-25', 3, 3, 3),
('2024-12-25', 4, 4, 4),
('2024-12-25', 5, 5, 5),
('2024-12-26', 1, 6, 6),
('2024-12-26', 2, 7, 7),
('2024-12-26', 3, 8, 8),
('2024-12-26', 4, 9, 9),
('2024-12-26', 5, 10, 10),
('2024-12-27', 1, 11, 11),
('2024-12-27', 2, 12, 12),
('2024-12-27', 3, 13, 13),
('2024-12-27', 4, 14, 14),
('2024-12-27', 5, 15, 15),
('2024-12-28', 1, 16, 16),
('2024-12-28', 2, 17, 17),
('2024-12-28', 3, 18, 18),
('2024-12-28', 4, 19, 19);

INSERT INTO `moviedb`.`show` (`show_date`, `movie_id`, `screen_id`, `time_id`)
VALUES
-- Today (2025-02-16)
('2025-02-16', 21, 21, 1),
('2025-02-16', 21, 22, 2),
('2025-02-16', 21, 23, 3),

('2025-02-16', 22, 24, 4),
('2025-02-16', 22, 25, 5),
('2025-02-16', 22, 26, 6),

('2025-02-16', 23, 27, 7),
('2025-02-16', 23, 28, 8),
('2025-02-16', 23, 29, 9),

('2025-02-16', 24, 30, 10),
('2025-02-16', 24, 31, 11),
('2025-02-16', 24, 32, 12),

('2025-02-16', 25, 33, 13),
('2025-02-16', 25, 34, 14),
('2025-02-16', 25, 35, 15),

('2025-02-16', 26, 36, 16),
('2025-02-16', 26, 37, 17),
('2025-02-16', 26, 38, 18),

('2025-02-16', 27, 39, 19),
('2025-02-16', 27, 40, 20),
('2025-02-16', 27, 41, 1),

('2025-02-16', 28, 42, 2),
('2025-02-16', 28, 43, 3),
('2025-02-16', 28, 44, 4),

('2025-02-16', 29, 45, 5),
('2025-02-16', 29, 46, 6),
('2025-02-16', 29, 47, 7),

('2025-02-16', 30, 48, 8),
('2025-02-16', 30, 49, 9),
('2025-02-16', 30, 50, 10),

-- Tomorrow (2025-02-17)
('2025-02-17', 21, 21, 11),
('2025-02-17', 21, 22, 12),
('2025-02-17', 21, 23, 13),

('2025-02-17', 22, 24, 14),
('2025-02-17', 22, 25, 15),
('2025-02-17', 22, 26, 16),

('2025-02-17', 23, 27, 17),
('2025-02-17', 23, 28, 18),
('2025-02-17', 23, 29, 19),

('2025-02-17', 24, 30, 20),
('2025-02-17', 24, 31, 1),
('2025-02-17', 24, 32, 2),

('2025-02-17', 25, 33, 3),
('2025-02-17', 25, 34, 4),
('2025-02-17', 25, 35, 5),

('2025-02-17', 26, 36, 6),
('2025-02-17', 26, 37, 7),
('2025-02-17', 26, 38, 8),

('2025-02-17', 27, 39, 9),
('2025-02-17', 27, 40, 10),
('2025-02-17', 27, 41, 11),

('2025-02-17', 28, 42, 12),
('2025-02-17', 28, 43, 13),
('2025-02-17', 28, 44, 14),

('2025-02-17', 29, 45, 15),
('2025-02-17', 29, 46, 16),
('2025-02-17', 29, 47, 17),

('2025-02-17', 30, 48, 18),
('2025-02-17', 30, 49, 19),
('2025-02-17', 30, 50, 20);



-- Inserting into screen_seat table
INSERT INTO `moviedb`.`screen_seat` (`seatno`, `screen_id`)
VALUES
('A1', 1), ('A2', 1), ('A3', 1), ('A4', 1), ('A5', 1),
('B1', 1), ('B2', 1), ('B3', 1), ('B4', 1), ('B5', 1),
('A1', 2), ('A2', 2), ('A3', 2), ('A4', 2), ('A5', 2),
('B1', 2), ('B2', 2), ('B3', 2), ('B4', 2), ('B5', 2);

-- Inserting into show_seat table
INSERT INTO `moviedb`.`show_seat` (`status`, `price`, `duration`, `show_id`, `screen_id`)
VALUES
(1, 10.00, '2h 30m', 1, 1),
(0, 10.00, '2h 30m', 2, 2),
(1, 15.00, '2h 15m', 3, 3),
(0, 15.00, '2h 15m', 4, 4),
(1, 20.00, '2h 00m', 5, 5),
(1, 10.00, '2h 30m', 6, 6),
(0, 20.00, '2h 15m', 7, 7),
(1, 10.00, '2h 30m', 8, 8),
(0, 15.00, '2h 15m', 9, 9),
(1, 15.00, '2h 00m', 10, 10),
(0, 10.00, '2h 30m', 11, 1),
(1, 15.00, '2h 15m', 12, 2),
(0, 10.00, '2h 30m', 13, 3),
(1, 20.00, '2h 00m', 14, 4),
(0, 10.00, '2h 30m', 15, 5),
(1, 20.00, '2h 15m', 16, 6),
(0, 15.00, '2h 30m', 17, 7),
(1, 10.00, '2h 00m', 18, 8),
(0, 15.00, '2h 15m', 19, 9);


-- Inserting into payment table
INSERT INTO `moviedb`.`payment` (`amount`, `date_time`, `method`, `transaction_id`)
VALUES
(100.00, '2024-12-25 10:00', 'Credit Card', 'TX12345'),
(150.00, '2024-12-25 10:30', 'Debit Card', 'TX12346'),
(200.00, '2024-12-25 11:00', 'Cash', 'TX12347'),
(120.00, '2024-12-25 11:30', 'Credit Card', 'TX12348'),
(140.00, '2024-12-25 12:00', 'Debit Card', 'TX12349'),
(100.00, '2024-12-25 12:30', 'Cash', 'TX12350'),
(160.00, '2024-12-25 13:00', 'Credit Card', 'TX12351'),
(180.00, '2024-12-25 13:30', 'Debit Card', 'TX12352'),
(200.00, '2024-12-25 14:00', 'Cash', 'TX12353'),
(150.00, '2024-12-25 14:30', 'Credit Card', 'TX12354'),
(130.00, '2024-12-25 15:00', 'Debit Card', 'TX12355'),
(110.00, '2024-12-25 15:30', 'Cash', 'TX12356'),
(120.00, '2024-12-25 16:00', 'Credit Card', 'TX12357'),
(170.00, '2024-12-25 16:30', 'Debit Card', 'TX12358'),
(150.00, '2024-12-25 17:00', 'Cash', 'TX12359'),
(190.00, '2024-12-25 17:30', 'Credit Card', 'TX12360'),
(210.00, '2024-12-25 18:00', 'Debit Card', 'TX12361'),
(220.00, '2024-12-25 18:30', 'Cash', 'TX12362'),
(230.00, '2024-12-25 19:00', 'Credit Card', 'TX12363'),
(240.00, '2024-12-25 19:30', 'Debit Card', 'TX12364');

select * from payment;

ALTER TABLE `moviedb`.`booking`
MODIFY COLUMN `booking_time` VARCHAR(50) NOT NULL;



-- Inserting into booking table
INSERT INTO `moviedb`.`booking` (`no_of_seats`, `booking_time`, `theatre_id`, `show_id`, `payment_id`, `user_id`)
VALUES
(2, '2024-12-25 10:00', 1, 1, 1, 1),
(3, '2024-12-25 10:30', 2, 2, 2, 2),
(4, '2024-12-25 11:00', 3, 3, 3, 3),
(1, '2024-12-25 11:30', 4, 4, 4, 4),
(2, '2024-12-25 12:00', 5, 5, 5, 5),
(3, '2024-12-25 12:30', 6, 6, 6, 6),
(4, '2024-12-25 13:00', 7, 7, 7, 7),
(1, '2024-12-25 13:30', 8, 8, 8, 8),
(2, '2024-12-25 14:00', 9, 9, 9, 9),
(3, '2024-12-25 14:30', 10, 10, 10, 10),
(4, '2024-12-25 15:00', 11, 11, 11, 11),
(1, '2024-12-25 15:30', 12, 12, 12, 12),
(2, '2024-12-25 16:00', 13, 13, 13, 13),
(3, '2024-12-25 16:30', 14, 14, 14, 14),
(4, '2024-12-25 17:00', 15, 15, 15, 15),
(1, '2024-12-25 17:30', 16, 16, 16, 16),
(2, '2024-12-25 18:00', 17, 17, 17, 17),
(3, '2024-12-25 18:30', 18, 18, 18, 18),
(4, '2024-12-25 19:00', 19, 19, 19, 19);

select * from booking;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

use moviedb;
select * from movie;

select * from `show`;
select * from screen;
select * from time;
select * from theatre;

select * from time;



select * from city;


SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;


INSERT INTO movie (movie_name, description, duration, genre, release_date, language)
VALUES
('Captain America: Brave New World', 'After meeting with newly elected U.S. Pr', '2:20', 'Thriller', '2025-02-12', 'English'),
('Piglet', 'On Kate\'s 21st birthday camping trip, he', '2:20', 'Horror', '2025-01-25', 'English'),
('Kinda Pregnant', 'When Lainy\'s plan to settle down and sta', '2:20', 'Comedy', '2025-02-04', 'English'),
('Babygirl', 'A high-powered CEO puts her career and f', '2:20', 'Drama', '2024-12-25', 'English'),
('The Wild Robot', 'After a shipwreck, an intelligent robot', '2:20', 'Animation', '2024-09-12', 'English'),
('Sonic the Hedgehog 3', 'Sonic, Knuckles, and Tails reunite again', '2:20', 'Action', '2024-12-19', 'English'),
('Panda Plan', 'International action star Jackie Chan is', '2:20', 'Action', '2024-10-01', 'Other'),
('Kraven the Hunter', 'Kraven Kravinoff\'s complex relationship', '2:20', 'Action', '2024-12-11', 'English'),
('Back in Action', 'Fifteen years after vanishing from the C', '2:20', 'Action', '2025-01-15', 'English'),
('Alarum', 'Two married spies caught in the crosshai', '2:20', 'Action', '2025-01-16', 'English'),
('Wolf Man', 'With his marriage fraying, Blake persuad', '2:20', 'Horror', '2025-01-15', 'English'),
('Sniper: The Last Stand', 'To stop an arms dealer from unleashing a', '2:20', 'Action', '2025-01-21', 'English'),
('Nosferatu', 'A gothic tale of obsession between a hau', '2:20', 'Horror', '2024-12-25', 'English'),
('Werewolves', 'A year after a supermoon’s light activat', '2:20', 'Action', '2024-12-04', 'English'),
('Star Trek: Section 31', 'Emperor Philippa Georgiou joins a secret', '2:20', 'Science Fiction', '2025-01-15', 'English'),
('The Substance', 'A fading celebrity decides to use a blac', '2:20', 'Horror', '2024-09-07', 'English'),
('The Gardener', 'Every year the Prime Minister has a list', '2:20', 'Action', '2025-01-30', 'Other'),
('Elevation', 'A single father and two women venture fr', '2:20', 'Action', '2024-11-07', 'English'),
('Death Whisperer 2', 'Three years after his sister\'s death, Ya', '2:20', 'Horror', '2024-10-10', 'Other');





-------------------------
INSERT INTO moviedb.payment (amount, date_time, method, transaction_id, user_id) 
VALUES
(500.00, '2024-12-25 09:55:00', 'Credit Card', 'TXN0001', 1),
(750.00, '2024-12-25 10:25:00', 'UPI', 'TXN0002', 2),
(1000.00, '2024-12-25 10:55:00', 'Net Banking', 'TXN0003', 3),
(250.00, '2024-12-25 11:25:00', 'Debit Card', 'TXN0004', 4),
(500.00, '2024-12-25 11:55:00', 'UPI', 'TXN0005', 5),
(750.00, '2024-12-25 12:25:00', 'Credit Card', 'TXN0006', 6),
(1000.00, '2024-12-25 12:55:00', 'Net Banking', 'TXN0007', 7),
(250.00, '2024-12-25 13:25:00', 'Cash', 'TXN0008', 8),
(500.00, '2024-12-25 13:55:00', 'Credit Card', 'TXN0009', 9),
(750.00, '2024-12-25 14:25:00', 'UPI', 'TXN0010', 10),
(1000.00, '2024-12-25 14:55:00', 'Net Banking', 'TXN0011', 11),
(250.00, '2024-12-25 15:25:00', 'Debit Card', 'TXN0012', 12),
(500.00, '2024-12-25 15:55:00', 'UPI', 'TXN0013', 13),
(750.00, '2024-12-25 16:25:00', 'Credit Card', 'TXN0014', 14),
(1000.00, '2024-12-25 16:55:00', 'Net Banking', 'TXN0015', 15),
(250.00, '2024-12-25 17:25:00', 'Cash', 'TXN0016', 16),
(500.00, '2024-12-25 17:55:00', 'Credit Card', 'TXN0017', 17),
(750.00, '2024-12-25 18:25:00', 'UPI', 'TXN0018', 18),
(1000.00, '2024-12-25 18:55:00', 'Net Banking', 'TXN0019', 19);