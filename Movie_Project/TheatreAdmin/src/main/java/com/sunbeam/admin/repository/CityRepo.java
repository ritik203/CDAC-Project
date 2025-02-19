package com.sunbeam.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.admin.entities.City;
@Repository
public interface CityRepo  extends JpaRepository<City, Integer>{

}
