import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "Pagamento de contas da casa" },
            { id: 2, name: "Saúde", description: "Plano de Saúde e Remédios" },
            { id: 3, name: "Lazer", description: "Cinema, parques, praia, etc" },
            { id: 4, name: "Salário", description: "Recebimento de Salário" },
            { id: 5, name: "Freelas", description: "Trabalhos como Freelancer" }
        ];
        
        const entries: Entry[] = [
            new Entry(1, 'Gás de Cozinha', "teste", "renevue", "70,80", "14/10/2019", true, categories[0].id, categories[0]),
            new Entry(2, 'Suplementos', "teste suplemento", "expense", "50,00", "25/07/2019", false, categories[1].id, categories[1]),
            new Entry(1, 'Cinema', "teste cinema", "renevue", "25,50", "29/04/2019", true, categories[2].id, categories[2])         
        ];

        return {categories, entries};
    }

}