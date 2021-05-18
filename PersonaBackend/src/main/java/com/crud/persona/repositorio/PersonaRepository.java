package com.crud.persona.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crud.persona.modelo.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long>{

}
