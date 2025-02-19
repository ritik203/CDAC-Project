package com.sunbeam.admin.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.admin.entities.Show;
import com.sunbeam.admin.repository.ShowRepository;

@Service
public class ShowServiceImpl {
    @Autowired
    private ShowRepository showRepository;

    public Show addShow(Show show) {
        return showRepository.save(show);
    }
   
  

    
}