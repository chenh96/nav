package tech.chenh.nav.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.io.IOException;
import java.util.Arrays;

@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
public class TokenFilter extends HttpFilter {

    private static final String TOKEN_KEY = "Token";
    private static final String[] IGNORE_PATHS = {"/user/login", "/exception/**", "/test"};
    private static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();

    private final UserContext userContext;

    @Autowired
    public TokenFilter(UserContext userContext) {
        this.userContext = userContext;
    }

    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (Arrays.stream(IGNORE_PATHS).anyMatch(path -> PATH_MATCHER.match(path, request.getServletPath()))) {
            chain.doFilter(request, response);
            return;
        }

        if (userContext.auth(request.getHeader(TOKEN_KEY)) || userContext.auth(request.getParameter(TOKEN_KEY))) {
            chain.doFilter(request, response);
            return;
        }

        request.getRequestDispatcher("/exception/security").forward(request, response);
    }

}