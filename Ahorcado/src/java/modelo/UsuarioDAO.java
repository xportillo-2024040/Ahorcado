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
        Usuario usuario = new Usuario();
        String sql = "SELECT codigo_usuario, correo_usuario, contraseña_usuario FROM Usuario WHERE correo_usuario = ? AND contraseña_usuario = ?";
        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, correo);
            ps.setString(2, contraseña);
            rs = ps.executeQuery();
            if (rs.next()) {
                usuario.setCodigoUsuario(rs.getInt("codigo_usuario"));
                usuario.setCorreoUsuario(rs.getString("correo_usuario"));
                usuario.setContraseñaUsuario(rs.getString("contraseña_usuario"));
            }
        } catch (Exception e) {
            System.out.println("Error en validar usuario");
            e.printStackTrace();
        }
        return usuario;
    }
}
