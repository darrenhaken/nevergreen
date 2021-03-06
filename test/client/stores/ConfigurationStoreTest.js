import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/client/NevergreenActions'
import {IMPORTED_DATA, IMPORTING_DATA, IMPORT_ERROR, EXPORTED_DATA} from '../../../src/client/backup/BackupActions'

describe('configuration store', () => {

  let subject, AppDispatcher, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/client/stores/ConfigurationStore', {'../common/AppDispatcher': AppDispatcher})

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()

    callback({
      type: AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  describe('importing data', () => {
    beforeEach(() => {
      callback({
        type: IMPORTING_DATA
      })
    })

    it('sets importing to true', () => {
      expect(subject.isImporting()).to.be.true
    })

    it('sets exporting to true', () => {
      expect(subject.isExporting()).to.be.true
    })
  })

  describe('import error', () => {
    beforeEach(() => {
      callback({
        type: IMPORT_ERROR,
        errors: ['some-error']
      })
    })

    it('sets importing to false', () => {
      expect(subject.isImporting()).to.be.false
    })
  })

  describe('export data', () => {
    beforeEach(() => {
      callback({
        type: EXPORTED_DATA,
        configuration: 'some-configuration'
      })
    })

    it('sets exporting to false', () => {
      expect(subject.isExporting()).to.be.false
    })

    it('sets the configuration', () => {
      expect(subject.getConfiguration()).to.equal('some-configuration')
    })
  })

  it('sets importing to false once configuration is restored', () => {
    callback({
      type: IMPORTED_DATA,
      messages: ['some-message']
    })
    expect(subject.isImporting()).to.be.false
  })
})
