package tech.chenh.nav.data.basic;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class BasicEntity {

    @GeneratedValue
    @Id
    private long id;

    @JsonIgnore
    @Version
    private long ver;

}