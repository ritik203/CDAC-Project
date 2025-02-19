package com.sunbeam.admin.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.admin.entities.Theatre;
import com.sunbeam.admin.services.TheaterServiceImpl;

@RestController
@RequestMapping("/theatre_admin/theatre")
public class TheatreController {

    @Autowired
    private TheaterServiceImpl theatreService;

    @PostMapping
    public String addTheatre(@RequestBody Theatre theatre) {
        theatreService.addTheatre(theatre);
        return "Success";
    }

    @GetMapping("/{id}")
    public Optional<Theatre> getTheatre(@PathVariable Integer id) {
        return theatreService.getTheatreById(id);
    }
}