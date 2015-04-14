var $ = require('jquery')
var React = require('react/addons')
var Router = require('react-router')
var Menu = require('./general/menu')
var migrations = require('../storage/migrations')

module.exports = {
    App: React.createClass({
        render: function () {
            return (
                <div>
                    <div id="menu">
                        <Menu.Menu />
                    </div>
                    <Router.RouteHandler/>
                </div>
            )
        },

        componentWillMount: function () {
            migrations.migrate()
        }
    })
}