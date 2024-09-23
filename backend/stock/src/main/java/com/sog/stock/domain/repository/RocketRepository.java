package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.Rocket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RocketRepository extends JpaRepository<Rocket, Integer> {

}
