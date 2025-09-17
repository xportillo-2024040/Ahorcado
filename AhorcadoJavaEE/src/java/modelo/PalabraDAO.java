package modelo;

import config.Conexion;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PalabraDAO {

    public Palabra obtenerPalabraAleatoria() {
        Palabra palabra = null;
        String sql = "{CALL sp_ObtenerPalabraAleatoria()}";
        Connection con = null;
        CallableStatement cs = null;
        ResultSet rs = null;

        try {
            Conexion cn = new Conexion();
            con = cn.Conexion(); 
            cs = con.prepareCall(sql);
            rs = cs.executeQuery();

            if (rs.next()) {
                palabra = new Palabra();
                palabra.setPalabra(rs.getString("palabra"));
                palabra.setPista1(rs.getString("pista1"));
                palabra.setPista2(rs.getString("pista2"));
                palabra.setPista3(rs.getString("pista3"));
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener palabra: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (cs != null) cs.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                System.err.println("Error al cerrar recursos: " + e.getMessage());
            }
        }
        return palabra;
    }
}