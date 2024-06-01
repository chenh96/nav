package tech.chenh.nav.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tech.chenh.nav.data.basic.BasicEntity;

@Getter
@Setter
@Table
@Entity
public class Bookmark extends BasicEntity {

    @Column(nullable = false)
    private int sort;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @Lob
    private String icon;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private Account account;

}