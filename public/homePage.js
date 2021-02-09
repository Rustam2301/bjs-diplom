'use strict';

const logoutUser = new LogoutButton();
logoutUser.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard();

function getStocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
getStocks();
setInterval(getStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = ({ currency, amount }) => {
    ApiConnector.addMoney({ currency, amount }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Вы успешно пополнили баланс на ${amount} ${currency}`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Успешная конвертация ${fromAmount} ${fromCurrency} в ${targetCurrency}`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
    ApiConnector.transferMoney({ to, currency, amount }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, `Вы успешно перевели ${amount} ${currency} пользователю ${to}`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({ id, name }, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, `Пользователь ${name} (${id}) успешно добавлен`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, `Пользователь ${name} (${id}) успешно удален из списка`);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}