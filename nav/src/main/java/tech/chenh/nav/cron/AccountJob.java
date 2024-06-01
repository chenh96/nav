package tech.chenh.nav.cron;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tech.chenh.nav.data.service.AccountService;

@Component
public class AccountJob {

    private final AccountService accountService;

    @Autowired
    public AccountJob(AccountService accountService) {
        this.accountService = accountService;
    }

    @Scheduled(fixedDelay = 24 * 60 * 60 * 1000L) // per day
    public void removeAccount() {
        accountService.deleteUnused();
    }

}