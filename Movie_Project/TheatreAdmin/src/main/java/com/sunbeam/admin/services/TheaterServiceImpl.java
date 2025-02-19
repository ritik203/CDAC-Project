package com.sunbeam.admin.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.admin.entities.Theatre;
import com.sunbeam.admin.entities.TheatreAdmin;
import com.sunbeam.admin.repository.TheatreAdminRepo;
import com.sunbeam.admin.repository.TheatreRepo;

@Service
public class TheaterServiceImpl {

    @Autowired
    private TheatreRepo theatreRepository;
     @Autowired
    private TheatreAdminRepo theatreAdminRepository;

    public Theatre addTheatre(Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    public Optional<Theatre> getTheatreById(Integer id) {
        return theatreRepository.findById(id);
    }
    public TheatreAdmin updateAdminDetails(Integer adminId, TheatreAdmin updatedDetails) {
        return theatreAdminRepository.findById(adminId)
                .map(existingAdmin -> {
                    existingAdmin.setName(updatedDetails.getName());
                    existingAdmin.setEmail(updatedDetails.getEmail());
                    existingAdmin.setMobile(updatedDetails.getMobile());
                    existingAdmin.setPassword(updatedDetails.getPassword());
                    existingAdmin.setRole(updatedDetails.getRole());
                    return theatreAdminRepository.save(existingAdmin);
                }).orElseThrow(() -> new RuntimeException("Admin not found with id: " + adminId));
    }

}
