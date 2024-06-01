package tech.chenh.nav.security;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tech.chenh.nav.data.entity.Account;
import tech.chenh.nav.data.service.AccountService;
import tech.chenh.nav.util.Security;

@Component
public class UserContext {

    private final AccountService accountService;

    @Getter
    private Account current;

    @Autowired
    public UserContext(AccountService accountService) {
        this.accountService = accountService;
    }

    public boolean auth(String token) {
        if (token == null) {
            return false;
        }

        String username = Security.decodeToken(token);
        if (username == null) {
            return false;
        }

        Account account = accountService.findByUsername(username);
        if (account == null) {
            return false;
        }

        current = account;
        return true;
    }

}