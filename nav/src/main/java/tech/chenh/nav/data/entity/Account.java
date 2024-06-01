package tech.chenh.nav.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tech.chenh.nav.data.basic.BasicEntity;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Table
@Entity
public class Account extends BasicEntity {

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @JsonIgnore
    @Column(nullable = false)
    private Date loginAt;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
    private List<Bookmark> bookmarks;

}