
import { employeeApi, countryApi, ApiError } from './employeeApi'

const BASE = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1'

const mockFetch = vi.fn()

describe('employeeApi', () => {
  beforeEach(() => {
    globalThis.fetch = mockFetch as unknown as typeof fetch
  })

  afterEach(() => {
    mockFetch.mockReset()
  })

  it('fetches all employees', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [{ id: '1' }] })
    const result = await employeeApi.getAll()
    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/employee`, expect.anything())
    expect(result).toEqual([{ id: '1' }])
  })

  it('fetches employee by id', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: '5' }) })
    const result = await employeeApi.getById('5')
    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/employee/5`, expect.anything())
    expect(result).toEqual({ id: '5' })
  })

  it('creates employee with POST', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: '9' }) })
    await employeeApi.create({
      name: 'A',
      email: 'a@b.com',
      mobile: '1234567890',
      country: 'C',
      state: 'S',
      district: 'D',
    })
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE}/employee`,
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('updates employee with PUT', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: '4' }) })
    await employeeApi.update('4', {
      name: 'A',
      email: 'a@b.com',
      mobile: '1234567890',
      country: 'C',
      state: 'S',
      district: 'D',
    })
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE}/employee/4`,
      expect.objectContaining({ method: 'PUT' }),
    )
  })

  it('deletes employee with DELETE', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => undefined })
    await employeeApi.delete('7')
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE}/employee/7`,
      expect.objectContaining({ method: 'DELETE' }),
    )
  })

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(employeeApi.getAll()).rejects.toThrow('status 500')
  })

  it('throws ApiError carrying the status when not found', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 })
    const err = await employeeApi.getById('999').catch((e) => e)
    expect(err).toBeInstanceOf(ApiError)
    expect((err as ApiError).status).toBe(404)
  })

  it('fetches countries', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [{ id: '1', country: 'India' }] })
    const result = await countryApi.getAll()
    expect(result).toEqual([{ id: '1', country: 'India' }])
  })
})
