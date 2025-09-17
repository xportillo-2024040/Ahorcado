package modelo;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UsuarioDAO {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;

    public Usuario validar(String correo, String contraseña) {
        Usuario usuario = null; 
        String sql = "SELECT codigo_usuario, correo_usuario, contraseña_usuario FROM Usuario WHERE correo_usuario = ?";

        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, correo);
            rs = ps.executeQuery();

            if (rs.next()) {
                String correo_usuario = rs.getString("correo_usuario");
                String contraseña_usuario = rs.getString("contraseña_usuario");
                if (correo.equals(correo_usuario) && contraseña.equals(contraseña_usuario)) {
                    usuario = new Usuario();
                    usuario.setCodigoUsuario(rs.getInt("codigo_usuario"));
                    usuario.setCorreoUsuario(correo_usuario);
                    usuario.setContraseñaUsuario(contraseña_usuario);
                }
            }

        } catch (Exception e) {
            System.out.println("Error en validar usuario");
            e.printStackTrace();
        }

        return usuario;
    }
}
