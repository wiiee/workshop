package com.workshop.app;

import com.wiiee.core.platform.config.FeatureConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;

/**
 * Created by wang.na on 2016/11/7.
 */

//@SpringBootApplication(scanBasePackages = "com",
//        exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class,
//                DataSourceTransactionManagerAutoConfiguration.class})
@SpringBootApplication(scanBasePackages = "com")
//@EnableMongoRepositories(basePackages = "com.wiiee.core.domain.repository")
@EnableConfigurationProperties({
        FeatureConfig.class
})
public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) throws Exception {
        ApplicationContext applicationContext = new SpringApplicationBuilder(Application.class)
                .properties("spring.config.name=application,feature")
                .run(args);
    }
}
