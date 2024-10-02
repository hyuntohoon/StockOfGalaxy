package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.FinancialStatements;
import com.sog.stock.domain.model.Stock;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialStatementsRepository extends JpaRepository<FinancialStatements, Integer> {

    List<FinancialStatements> findByStock(Stock stock);


}
