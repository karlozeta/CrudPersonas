package com.crud.persona.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crud.persona.modelo.Rol;
import com.crud.persona.servicios.RolService;

@RestController
@RequestMapping("/roles/")
public class RolRest {
	
	@Autowired
	private RolService rolService;
	
	@GetMapping
	private ResponseEntity<List<Rol>> getAllRoles (){
		return ResponseEntity.ok(rolService.findAll());
	}

}
