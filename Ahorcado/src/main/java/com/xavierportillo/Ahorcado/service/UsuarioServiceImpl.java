package com.xavierportillo.Ahorcado.service;

import com.xavierportillo.Ahorcado.model.Usuario;
import com.xavierportillo.Ahorcado.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final List<String> dominiosPermitidos = List.of(
            "@gmail.com",
            "@outlook.com",
            "@yahoo.com",
            "@kinal.edu.gt",
            "@icloud.com"
    );

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario getUsuarioById(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        // Validar que el correo esté en uno de los dominios permitidos
        if (!esDominioValido(usuario.getCorreoUsuario())) {
            throw new RuntimeException("El correo debe tener un dominio valido (@gmail.com, @outlook.com, @yahoo.com, @kinal.edu.gt, @icloud.com)");
        }

        if (usuarioRepository.existsByCorreoUsuario(usuario.getCorreoUsuario())) {
            throw new RuntimeException("El correo ya está en uso");
        }

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Integer id, Usuario usuario) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        // Validar que el correo esté en uno de los dominios permitidos
        if (!esDominioValido(usuario.getCorreoUsuario())) {
            throw new RuntimeException("El correo debe tener un dominio valido (@gmail.com, @outlook.com, @yahoo.com, @kinal.edu.gt, @icloud.com)");
        }

        if (usuarioRepository.existsByCorreoUsuarioAndCodigoUsuarioNot(usuario.getCorreoUsuario(), id)) {
            throw new RuntimeException("El correo ya está en uso por otro usuario");
        }

        existingUsuario.setCorreoUsuario(usuario.getCorreoUsuario());
        existingUsuario.setContraseñaUsuario(usuario.getContraseñaUsuario());

        return usuarioRepository.save(existingUsuario);
    }

    @Override
    public void deleteUsuario(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("El usuario no existe");
        }

        usuarioRepository.deleteById(id);
    }

    private boolean esDominioValido(String correo) {
        return dominiosPermitidos.stream().anyMatch(correo::endsWith);
    }
}
