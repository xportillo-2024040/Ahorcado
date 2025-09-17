package com.xavierportillo.Ahorcado.controller;

import com.xavierportillo.Ahorcado.model.Palabra;
import com.xavierportillo.Ahorcado.service.PalabraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/palabra")
public class PalabraController {

    private final PalabraService palabraService;

    public PalabraController(PalabraService palabraService) {
        this.palabraService = palabraService;
    }

    @GetMapping
    public ResponseEntity<?> getAllPalabras() {
        try {
            List<Palabra> palabras = palabraService.getAllPalabras();
            return ResponseEntity.ok(palabras);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPalabraById(@PathVariable Integer id) {
        try {
            Palabra palabra = palabraService.getPalabraById(id);
            return ResponseEntity.ok(palabra);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createPalabra(@RequestBody Palabra palabra) {
        try {
            Palabra newPalabra = palabraService.savePalabra(palabra);
            return ResponseEntity.status(HttpStatus.CREATED).body(newPalabra);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePalabra(@PathVariable Integer id, @RequestBody Palabra palabra) {
        try {
            Palabra updated = palabraService.updatePalabra(id, palabra);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePalabra(@PathVariable Integer id) {
        try {
            palabraService.deletePalabra(id);
            return ResponseEntity.ok("Se elimino correctamente la palabra");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
