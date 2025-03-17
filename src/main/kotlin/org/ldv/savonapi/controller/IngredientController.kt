// Fichier : IngredientController.kt
package org.ldv.savonapi.controller

import org.ldv.savonapi.model.dao.IngredientDAO
import org.ldv.savonapi.model.entity.Ingredient
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@RequestMapping("/api-savon/v1/ingredient")
class IngredientController(val ingredientDAO: IngredientDAO) {

    @GetMapping
    fun index(): List<Ingredient> {
        return ingredientDAO.findAll()
    }

    @GetMapping("/{id}")
    fun show(@PathVariable id: Long): ResponseEntity<Ingredient> {
        return ingredientDAO.findById(id)
            .map { ingredient -> ResponseEntity.ok(ingredient) }
            .orElse(ResponseEntity.notFound().build())
    }

    @PostMapping
    fun store(@RequestBody ingredient: Ingredient): ResponseEntity<Ingredient> {
        val savedIngredient = ingredientDAO.save(ingredient)
        return ResponseEntity.status(HttpStatus.CREATED).body(savedIngredient)
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updatedIngredient: Ingredient
    ): ResponseEntity<Ingredient> {
        return ingredientDAO.findById(id).map { existingIngredient ->
            existingIngredient.apply {
                nom = updatedIngredient.nom
                iode = updatedIngredient.iode
                ins = updatedIngredient.ins
                sapo = updatedIngredient.sapo
                volMousse = updatedIngredient.volMousse
                tenueMousse = updatedIngredient.tenueMousse
                douceur = updatedIngredient.douceur
                lavant = updatedIngredient.lavant
                durete = updatedIngredient.durete
                solubilite = updatedIngredient.solubilite
                sechage = updatedIngredient.sechage
                estCorpsGras = updatedIngredient.estCorpsGras
            }
            ResponseEntity.ok(ingredientDAO.save(existingIngredient))
        }.orElse(ResponseEntity.notFound().build())
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        return if (ingredientDAO.existsById(id)) {
            ingredientDAO.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/all")
    fun deleteAll(): ResponseEntity<Void> {
        ingredientDAO.deleteAll()
        return ResponseEntity.noContent().build()
    }
}