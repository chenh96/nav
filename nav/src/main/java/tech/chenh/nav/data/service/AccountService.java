package tech.chenh.nav.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.chenh.nav.data.entity.Account;
import tech.chenh.nav.data.repo.AccountRepo;
import tech.chenh.nav.exception.MessagedException;
import tech.chenh.nav.model.LoginForm;
import tech.chenh.nav.util.Security;

import java.util.Date;

@Service
public class AccountService {

    private final AccountRepo accountRepo;

    @Autowired
    public AccountService(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    public Account findByUsername(String username) {
        return accountRepo.findFirstByUsername(username);
    }

    @Transactional
    public String login(LoginForm login) {
        String username = login.getUsername();
        String password = login.getPassword();

        Account account = accountRepo.findFirstByUsername(username);
        String encryptedPassword = Security.encryptPassword(password, username);

        if (account == null) {
            account = new Account();
            account.setUsername(username);
            account.setPassword(encryptedPassword);
        } else if (!account.getPassword().equals(encryptedPassword)) {
            throw new MessagedException("用户名或密码错误");
        }

        account.setLoginAt(new Date());
        accountRepo.save(account);

        return Security.createToken(username);
    }

    @Transactional
    public void deleteUnused() {
        accountRepo.deleteAllByLoginAtBefore(new Date(System.currentTimeMillis() - 365 * 24 * 60 * 60 * 1000L)); // 1 year
    }

}