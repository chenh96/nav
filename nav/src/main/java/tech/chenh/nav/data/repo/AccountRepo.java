package tech.chenh.nav.data.repo;


import org.springframework.stereotype.Repository;
import tech.chenh.nav.data.basic.BasicRepo;
import tech.chenh.nav.data.entity.Account;

import java.util.Date;

@Repository
public interface AccountRepo extends BasicRepo<Account> {

    Account findFirstByUsername(String username);

    void deleteAllByLoginAtBefore(Date before);

}