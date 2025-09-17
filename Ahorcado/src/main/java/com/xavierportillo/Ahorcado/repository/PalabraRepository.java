package com.xavierportillo.Ahorcado.repository;

import com.xavierportillo.Ahorcado.model.Palabra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PalabraRepository extends JpaRepository<Palabra, Integer> {
    boolean existsByPalabra(String palabra);

    boolean existsByPalabraAndCodigoPalabraNot(String palabra, Integer codigoPalabra);
}
