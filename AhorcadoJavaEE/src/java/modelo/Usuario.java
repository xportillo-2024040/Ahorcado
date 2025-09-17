package modelo;

public class Usuario {

    private int codigoUsuario;
    private String correoUsuario;
    private String contraseñaUsuario;

    public Usuario() {
    }

    public Usuario(int codigoUsuario, String correoUsuario, String contraseñaUsuario) {
        this.codigoUsuario = codigoUsuario;
        this.correoUsuario = correoUsuario;
        this.contraseñaUsuario = contraseñaUsuario;
    }

    public int getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(int codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public String getContraseñaUsuario() {
        return contraseñaUsuario;
    }

    public void setContraseñaUsuario(String contraseñaUsuario) {
        this.contraseñaUsuario = contraseñaUsuario;
    }

    @Override
    public String toString() {
        return "Usuario{" + 
               "codigoUsuario=" + codigoUsuario + 
               ", correoUsuario=" + correoUsuario + 
               ", contraseñaUsuario=" + contraseñaUsuario + '}';
    }
}
