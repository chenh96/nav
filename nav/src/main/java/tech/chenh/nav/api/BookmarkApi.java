package tech.chenh.nav.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.chenh.nav.data.service.BookmarkService;
import tech.chenh.nav.model.BookmarkForm;
import tech.chenh.nav.model.Result;

import java.util.List;

@RequestMapping("bookmark")
@RestController
public class BookmarkApi {

    private final BookmarkService bookmarkService;

    @Autowired
    public BookmarkApi(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public Result<?> get() {
        return Result.ok(bookmarkService.find());
    }

    @PostMapping
    public Result<?> post(@RequestBody List<BookmarkForm> bookmarks) {
        return Result.ok(bookmarkService.save(bookmarks));
    }

}