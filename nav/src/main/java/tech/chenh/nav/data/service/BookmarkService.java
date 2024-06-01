package tech.chenh.nav.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.chenh.nav.data.entity.Account;
import tech.chenh.nav.data.entity.Bookmark;
import tech.chenh.nav.data.repo.BookmarkRepo;
import tech.chenh.nav.model.BookmarkForm;
import tech.chenh.nav.security.UserContext;

import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepo bookmarkRepo;
    private final UserContext userContext;

    @Autowired
    public BookmarkService(BookmarkRepo bookmarkRepo, UserContext userContext) {
        this.bookmarkRepo = bookmarkRepo;
        this.userContext = userContext;
    }

    @Transactional
    public List<Bookmark> save(List<BookmarkForm> bookmarks) {
        Account user = userContext.getCurrent();
        bookmarkRepo.deleteAllByAccount(user);

        return bookmarkRepo.saveAll(bookmarks.stream().map(bookmark -> {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setAccount(user);
            newBookmark.setSort(bookmark.getSort());
            newBookmark.setName(bookmark.getName());
            newBookmark.setUrl(bookmark.getUrl());
            newBookmark.setIcon(bookmark.getIcon());
            return newBookmark;
        }).toList());
    }

    public List<Bookmark> find() {
        return bookmarkRepo.findAllByAccountOrderBySortAsc(userContext.getCurrent());
    }

}