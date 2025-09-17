package com.xavierportillo.Ahorcado.service;

import com.xavierportillo.Ahorcado.model.Palabra;
import com.xavierportillo.Ahorcado.repository.PalabraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PalabraServiceImpl implements PalabraService {

    private final PalabraRepository palabraRepository;

    public PalabraServiceImpl(PalabraRepository palabraRepository) {
        this.palabraRepository = palabraRepository;
    }

    @Override
    public List<Palabra> getAllPalabras() {
        return palabraRepository.findAll();
    }

    @Override
    public Palabra getPalabraById(Integer id) {
        return palabraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Palabra no encontrada con ID: " + id));
    }

    @Override
    public Palabra savePalabra(Palabra palabra) {
        if (palabraRepository.existsByPalabra(palabra.getPalabra())) {
            throw new RuntimeException("La palabra ya está en uso");
        }

        return palabraRepository.save(palabra);
    }

    @Override
    public Palabra updatePalabra(Integer id, Palabra palabra) {
        Palabra existingPalabra = palabraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Palabra no encontrada con ID: " + id));

        if (palabraRepository.existsByPalabraAndCodigoPalabraNot(palabra.getPalabra(), id)) {
            throw new RuntimeException("La palabra ya está en uso por otra entrada");
        }

        existingPalabra.setPalabra(palabra.getPalabra());
        existingPalabra.setPista1(palabra.getPista1());
        existingPalabra.setPista2(palabra.getPista2());
        existingPalabra.setPista3(palabra.getPista3());

        return palabraRepository.save(existingPalabra);
    }

    @Override
    public void deletePalabra(Integer id) {
        if (!palabraRepository.existsById(id)) {
            throw new RuntimeException("La palabra no existe");
        }

        palabraRepository.deleteById(id);
    }
}
