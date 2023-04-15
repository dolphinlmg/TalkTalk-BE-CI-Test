package com.inha.server.user.repository;

import com.inha.server.user.model.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findById(String id);

  Optional<User> findByEmail(String email);
}
