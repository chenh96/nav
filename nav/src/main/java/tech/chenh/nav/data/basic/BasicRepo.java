package tech.chenh.nav.data.basic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BasicRepo<T extends BasicEntity> extends JpaRepository<T, Long> {
}