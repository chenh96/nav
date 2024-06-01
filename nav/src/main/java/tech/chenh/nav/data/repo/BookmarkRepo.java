package tech.chenh.nav.data.repo;

import org.springframework.stereotype.Repository;
import tech.chenh.nav.data.basic.BasicRepo;
import tech.chenh.nav.data.entity.Account;
import tech.chenh.nav.data.entity.Bookmark;

import java.util.List;

@Repository
public interface BookmarkRepo extends BasicRepo<Bookmark> {

    List<Bookmark> findAllByAccountOrderBySortAsc(Account account);

    void deleteAllByAccount(Account account);

}