package com.sunbeam.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.admin.entities.Theatre;
@Repository
public interface TheatreRepo extends JpaRepository<Theatre, Integer> {

}
