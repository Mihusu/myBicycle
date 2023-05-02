// Prototype translate text function
// Could be expanded to handle all text coming from backend
// Todo: expand and complete dict to possess all possible entries
export function translateString(string) {
    const dict = { male: "Herre", female: "Dame", child: "Barn", black: "Sort", race: "Racer" };
    if (dict[string]) {
        return dict[string];
    } else {
        return string;
    }
}