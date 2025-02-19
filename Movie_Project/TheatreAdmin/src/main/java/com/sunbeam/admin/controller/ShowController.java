package com.sunbeam.admin.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.admin.entities.Show;
import com.sunbeam.admin.services.ShowServiceImpl;

@RestController
@RequestMapping("/theatre_admin/show")
public class ShowController {

    @Autowired
    private ShowServiceImpl showService;

    @PostMapping
    public String addShow(@RequestBody Show show) {
        showService.addShow(show);
        return "Success";
    }
  
}