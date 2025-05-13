import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchCategories } from "./categorySlice"; // Assure-toi que le chemin est correct

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("categorySlice async actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      categories: {
        categories: [],
        loading: false,
        error: null,
      },
    });
  });

  it("should dispatch the pending action and then the fulfilled action on successful fetch", async () => {
    // Simule une réponse réussie de l'API
    const mockResponseData = [
      { id: 1, name: "Catégorie 1" },
      { id: 2, name: "Catégorie 2" },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    );

    await store.dispatch(fetchCategories());
    const actions = store.getActions();

    // Vérifie que l'action "pending" a été dispatchée en premier
    expect(actions[0].type).toEqual("categories/fetchAll/pending");

    // Attends que la promesse de l'action asynchrone soit résolue
    await actions[1].payload;

    // Vérifie que l'action "fulfilled" a été dispatchée ensuite avec les données
    expect(actions[1].type).toEqual("categories/fetchAll/fulfilled");
    expect(actions[1].payload).toEqual(mockResponseData);

    // Restaure la fonction fetch globale
    global.fetch.mockRestore();
  });

  it("should dispatch the pending action and then the rejected action on failed fetch", async () => {
    // Simule une erreur lors de l'appel API
    const mockError = "Failed to fetch";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve(mockError),
      })
    );

    await store.dispatch(fetchCategories());
    const actions = store.getActions();

    // Vérifie que l'action "pending" a été dispatchée en premier
    expect(actions[0].type).toEqual("categories/fetchAll/pending");

    // Attends que la promesse de l'action asynchrone soit résolue
    try {
      await actions[1].payload;
    } catch (error) {
      // Vérifie que l'action "rejected" a été dispatchée ensuite avec l'erreur
      expect(actions[1].type).toEqual("categories/fetchAll/rejected");
      expect(actions[1].payload).toEqual(mockError);
    }

    // Restaure la fonction fetch globale
    global.fetch.mockRestore();
  });
});
