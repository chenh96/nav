package tech.chenh.nav.data.basic;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@MappedSuperclass
public abstract class BasicEntity {

    // @SequenceGenerator(name = "idGenerator")
    // @GeneratedValue(generator = "idGenerator")
    @GeneratedValue
    @Id
    private long id;

    @JsonIgnore
    @Version
    private long ver;

}