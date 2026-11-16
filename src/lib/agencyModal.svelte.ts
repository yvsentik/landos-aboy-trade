// Общее состояние всплывающего окна заявки агентства: одно окно на весь сайт.
export const ui = $state({ open: false, form: false });

/** Открыть окно. form = true – сразу форма заявки, иначе выбор: Telegram, Макс, форма. */
export const ask = (form = false) => {
	ui.form = form;
	ui.open = true;
};
