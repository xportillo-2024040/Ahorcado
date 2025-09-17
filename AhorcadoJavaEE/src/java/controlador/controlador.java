package controlador;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Palabra;
import modelo.PalabraDAO;

@WebServlet(name = "Controlador", urlPatterns = {"/Controlador"})
public class controlador extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String accion = request.getParameter("accion");
        
        if (accion != null && accion.equals("obtenerPalabra")) {
            PalabraDAO dao = new PalabraDAO();
            Palabra palabra = dao.obtenerPalabraAleatoria();
            
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            
            if (palabra != null) {
                Gson gson = new Gson();
                response.getWriter().write(gson.toJson(palabra));
            } else {
                response.getWriter().write("{\"error\":\"No se pudo obtener la palabra\"}");
            }
        } else {
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}