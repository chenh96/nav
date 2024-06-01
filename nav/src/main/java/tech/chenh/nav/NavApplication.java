package tech.chenh.nav;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class NavApplication {

    public static void main(String[] args) {
        SpringApplication.run(NavApplication.class, args);
    }

}
