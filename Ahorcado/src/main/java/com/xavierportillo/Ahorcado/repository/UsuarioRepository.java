package com.xavierportillo.Ahorcado.repository;

import com.xavierportillo.Ahorcado.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    boolean existsByCorreoUsuario(String correoUsuario);

    boolean existsByCorreoUsuarioAndCodigoUsuarioNot(String correoUsuario, Integer codigoUsuario);
}
