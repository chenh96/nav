package tech.chenh.nav.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.chenh.nav.data.service.AccountService;
import tech.chenh.nav.model.LoginForm;
import tech.chenh.nav.model.Result;

@RequestMapping("user")
@RestController
public class UserApi {

    private final AccountService accountService;

    @Autowired
    public UserApi(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("login")
    public Result<?> login(@RequestBody LoginForm login) {
        return Result.ok(accountService.login(login));
    }

}